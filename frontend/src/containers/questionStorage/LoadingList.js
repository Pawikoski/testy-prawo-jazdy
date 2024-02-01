import { ListGroup, Placeholder } from "react-bootstrap";
import { Pagination, Stack } from "@mui/material";


const LoadingList = () => {
  return (
    <ListGroup as="ul">
      {[...Array(100)].map((i, idx) => (
        <ListGroup.Item key={idx} as="li" className="d-flex justify-content-between align-items-start py-3" action>
          <div className="ms-2 me-auto w-100">
            <Placeholder as="p" animation="glow">
              <Placeholder xs={12} />
            </Placeholder>
            <div className="d-flex flex-row justify-content-start flex-wrap">
              <Placeholder as='p' className="me-1" xs={parseInt(Math.ceil(Math.random() * 3.5))}></Placeholder>
              <Placeholder as='p' className="me-1" xs={parseInt(Math.ceil(Math.random() * 3.5))}></Placeholder>
              <Placeholder as='p' className="me-1" xs={parseInt(Math.ceil(Math.random() * 3.5))}></Placeholder>
            </div>
          </div>
        </ListGroup.Item>
      ))
      }
      <div className="d-flex justify-content-center">
        <Stack spacing={2} mt="2rem">
          <Pagination count={10} page={1} color="primary" />
        </Stack>
      </div>
    </ListGroup>
  );
}

export default LoadingList;


