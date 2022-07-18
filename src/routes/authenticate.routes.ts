import { Router } from "express";
import { AuthenticateUserController } from "../modules/accounts/useCases/authenticateUser/AuthenticaUserController";

const authenticateRoutes = Router()
const authenticateUserController = new AuthenticateUserController

authenticateRoutes.post("/sessions", authenticateUserController.handle)

export { authenticateRoutes }