import { MigrationInterface, getRepository } from 'typeorm';
import { Roles } from '../constants/roles';
import { Role } from '../entity/role.entity';

export class SeedRoles1590364873831 implements MigrationInterface {
    public async up(): Promise<void> {
        const roleRepo = getRepository(Role);
        await roleRepo.save(Roles);
    }

    public async down(): Promise<void> {}
}
