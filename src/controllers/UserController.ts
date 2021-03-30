import { Request, Response } from 'express';
import pool from '@database/connection';
import { hash } from 'bcryptjs';

export class UsersController {
  async create(req: Request, res: Response) {
    const db = await pool.connect();

    const { name, login, password } = req.body;

    try {
      const hashedPassword = await hash(password, 8);
      console.log('hashedPassword', hashedPassword);
      if (name && login && password && hashedPassword)
        db.query(
          `INSERT INTO tb_usuario(nome, login, senha) VALUES($1, $2, $3);`,
          [name, login, hashedPassword],
          (error, result) => {
            if (error) {
              console.error(error.stack);
              return res.status(500).json({ message: 'Erro inesperado!' });
            }

            return res.status(200).json({ ok: true });
          },
        );
      else
        return res
          .status(400)
          .json({ error: 'Os dados enviados são incorretos!' });
    } catch (error) {
      throw error;
    }
  }

  async index(req: Request, res: Response) {
    const db = await pool.connect();
    try {
      db.query('SELECT * FROM tb_usuario;', (error, result) => {
        if (error) {
          throw error;
        }

        const data = (result.rows as any[]).map((user) => {
          return {
            name: user.nome,
            id: user.id,
            login: user.login,
          };
        });
        res.status(200).json(data);
      });
    } catch (error) {
      throw error;
    }
  }

  async edit(req: Request, res: Response) {
    const db = await pool.connect();

    const { id } = req.params;
    const { name, login, password } = req.body;

    try {
      if (name && login && password)
        db.query(
          'UPDATE tb_usuario SET nome = $1, login = $2, senha = $3 WHERE id = $4',
          [name, login, password, id],
          (error, result) => {
            if (error) {
              throw error;
            }

            res.status(200).json({ ok: true });
          },
        );
      else
        return res
          .status(400)
          .json({ error: 'Os dados enviados são incorretos!' });
    } catch (error) {
      throw error;
    }
  }

  async delete(req: Request, res: Response) {
    const db = await pool.connect();

    const { id } = req.params;

    if (id)
      db.query(
        'DELETE FROM tb_usuario WHERE id = $1;',
        [id],
        (error, result) => {
          if (error) {
            throw error;
          }

          res.status(200).json({ ok: true });
        },
      );
    else return res.status(400).json({ error: 'Id inválido' });
  }
}
