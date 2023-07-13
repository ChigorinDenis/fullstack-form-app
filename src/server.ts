import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());

interface User {
  email: string;
  number: string;
}

app.get("/api/users", (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    const number = req.query.number as string;
        const users: User[] = [
      { email: "jim@gmail.com", number: "221122" },
      { email: "jam@gmail.com", number: "830347" },
      { email: "john@gmail.com", number: "221122" },
      { email: "jams@gmail.com", number: "349425" },
      { email: "jams@gmail.com", number: "141424" },
      { email: "jill@gmail.com", number: "822287" },
      { email: "jill@gmail.com", number: "822286" },
    ];

    const filteredUsers = users.filter((user) => {
      return (
        (email === undefined ||
          user.email.toLowerCase().includes(email.toLowerCase())) &&
        (number === undefined || user.number.includes(number))
      );
    });
    setTimeout(() => {
      res.json(filteredUsers);
    }, 5000);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
