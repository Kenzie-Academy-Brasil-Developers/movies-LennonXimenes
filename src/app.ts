import "dotenv/config";
import express, { Application } from "express";
import { startDatabase } from "./database";
import logics from "./logics";
import middlewares from "./middlewares";

const app: Application = express();
app.use(express.json());

app.post("/movies",middlewares.nameExists, logics.createMovie);
app.get("/movies", logics.readMovie);

app.use("/movies/:id", middlewares.idExists);

app.get("/movies/:id", logics.retriveMovie);
app.patch("/movies/:id", middlewares.nameExists, logics.updateMovie);
app.delete("/movies/:id", logics.deleteMovie);

const PORT: number = 3000;
app.listen(PORT, async (): Promise<void> => {
    await startDatabase();
    console.log(`Application is runing on port: ${PORT}`);
});
