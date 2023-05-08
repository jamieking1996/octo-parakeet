import express, { Request, Response, Router } from 'express';
import bodyParser from 'body-parser';
import { User } from "../interfaces/user.interface";
import Ajv, { JSONSchemaType } from "ajv";

export class UserRouter {
  private router: Router;
  private users: Map<string, User>;

  private createUserValidationSchema: JSONSchemaType<Omit<User, 'id'>> = {
    type: 'object',
    properties: {
      name: { type: 'string' },
      email: { type: 'string' },
      mobile: { type: 'string' },
    },
    required: ['name', 'email', 'mobile'],
    additionalProperties: false,
  };

  private updateUserValidationSchema: JSONSchemaType<Partial<Omit<User, 'id'>>> = {
    type: 'object',
    properties: {
      name: { type: 'string', nullable: true },
      email: { type: 'string', nullable: true },
      mobile: { type: 'string', nullable: true },
    },
    required: [],
    additionalProperties: false,
  };

  constructor() {
    this.router = express.Router();
    this.users = new Map<string, User>();

    this.router.use(bodyParser.json());
    this.router.post('/users', this.createUser);
    this.router.put('/users/:id', this.updateUser);
    this.router.get('/users', this.getUsers);
    this.router.delete('/users/:id', this.deleteUser);
    this.router.get('/users/:id', this.getUser);
  }

  public getRouter(): Router {
    return this.router;
  }

  private getUsers = (req: Request, res: Response<User[]>) => {
    res.status(200).json([...this.users.values()]);
  }

  private createUser = (req: Request, res: Response<User | string>) => {
    const ajv = new Ajv({});
    const validate = ajv.compile(this.createUserValidationSchema);
    if(!validate(req.body)) {
      res.status(400).send('Bad Request');
      return;
    }
    const id = String(this.users.size + 1);
    const { name, email, mobile } = req.body;
    const newUser = { id, name, email, mobile };
    this.users.set(newUser.id, newUser);
    res.status(201).json(newUser);
  }

  private updateUser = (req: Request, res: Response<User | string>) => {
    const { id } = req.params;
    const user = this.users.get(id);
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    const ajv = new Ajv({});
    const validate = ajv.compile(this.updateUserValidationSchema);
    if(!validate(req.body)) {
      res.status(400).send('Bad Request');
      return;
    }
    const newUser = {
      ...user,
      ...req.body
    };
    this.users.set(newUser.id, newUser);
    res.status(200).json(newUser);
  }

  private deleteUser = (req: Request, res: Response<string>) => {
    const { id } = req.params;
    const user = this.users.get(id);
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    this.users.delete(id);
    res.status(200).json("Success");
  }

  private getUser = (req: Request, res: Response<User | string>) => {
    const { id } = req.params;
    const user = this.users.get(id);
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    res.status(200).json(user);
  }
}