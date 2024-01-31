import pandas as pd

from typing import Any
from django.core.management.base import BaseCommand
from api.models import Question, Category
from math import isnan


class Command(BaseCommand):
    def convert_nan_str_to_none(self, value: Any) -> Any:
        if isinstance(value, float) and isnan(value):
            return None
        return value

    def handle(self, *args: Any, **options: Any) -> str | None:
        xslx_url = "https://www.gov.pl/attachment/1e683ccd-6293-4656-9c16-fab2628b0c46"
        df = pd.read_excel(xslx_url, sheet_name="Arkusz1")
        for row in df.itertuples():
            question_no = row[2]
            multilang_data = {
                "pl": {
                    "question": row[3],
                    "answer_a": row[4],
                    "answer_b": row[5],
                    "answer_c": row[6],
                },
                "en": {
                    "question": row[7],
                    "answer_a": row[8],
                    "answer_b": row[9],
                    "answer_c": row[10],
                },
                "de": {
                    "question": row[11],
                    "answer_a": row[12],
                    "answer_b": row[13],
                    "answer_c": row[14],
                }
            }
            valid_answer = row[15]
            media = row[16]
            categories = [Category.objects.get_or_create(name=category)[0] for category in row[17].split(",")]  # Get or create categories from string "a,b,c"

            source = row[18]
            security_explenation = row[19]

            for lang in ["pl", "en", "de"]:
                try:
                    question = Question.objects.get(question_no=question_no, language=lang)
                    self.stdout.write(self.style.WARNING(f"Question {question_no} already exists"))
                except Question.DoesNotExist:
                    question = Question.objects.create(
                        question_no=question_no,
                        language=lang,
                        text=multilang_data[lang]["question"],
                        answer_a=self.convert_nan_str_to_none(multilang_data[lang]["answer_a"]),
                        answer_b=self.convert_nan_str_to_none(multilang_data[lang]["answer_b"]),
                        answer_c=self.convert_nan_str_to_none(multilang_data[lang]["answer_c"]),
                        correct_answer=valid_answer,
                        media=self.convert_nan_str_to_none(media),
                        question_source=source,
                        security_explenation=security_explenation,
                    )
                    question.categories.set(categories)
                    question.save()
                    self.stdout.write(self.style.SUCCESS(f"Question {question_no} added"))
