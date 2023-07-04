import { Request, Response, NextFunction } from "express";

export default function errorHandler(app: any) {
  
  app.use((_: Request, res: Response) => {
    res.status(404).json({ errorMessage: "This route does not exist" });
  });

  app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
    console.error("ERROR", req.method, req.path, err);
    if (!res.headersSent) {
      res.status(500).json({
        errorMessage: "Internal server error. Check the server console",
        err
      });
    }
  });
}
