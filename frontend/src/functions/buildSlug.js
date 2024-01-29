import slugify from "slugify";

const buildSlug = (question, question_no) => {
  question = question.split(' ').slice(0, 10).join(' ');
  const slug = slugify(question, { lower: true, strict: true });
  return "/pytanie/" + slug + ',' + question_no;
}

export default buildSlug;