import { prisma } from "@server/prisma";
import { createService as createUsersService } from "./users.service";
export { createService as notificationService } from "./notification.service";

export const usersService = createUsersService(prisma);
