import { Controller, Get, Param, Post, Body, Patch, UseGuards, Request } from '@nestjs/common';
import { AvatarService } from './avatar.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('avatar')
export class AvatarController {
  constructor(private readonly avatarService: AvatarService) {}

  // Obtener todos los avatares disponibles
  @Get()
  getAll() {
    return this.avatarService.findAll();
  }

  // Obtener avatar por id
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.avatarService.findOne(id);
  }

  // Asignar avatar activo al jugador
  @UseGuards(JwtAuthGuard)
  @Patch('select')
  selectAvatar(@Request() req, @Body('avatarId') avatarId: number) {
    const playerId = req.user.userId; // asumiendo que userId es el id del jugador en el JWT
    return this.avatarService.assignAvatarToPlayer(playerId, avatarId);
  }
}
