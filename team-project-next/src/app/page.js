import Image from "next/image";

import { Button } from "@mui/material";

export default function Home() {
  return (
    <div>
      <h1>Hello, MUI!</h1>
      <Button variant="contained" color="primary">
        Click Me
      </Button>
    </div>
  );
}
