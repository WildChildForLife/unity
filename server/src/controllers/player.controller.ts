import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {authenticate} from '@loopback/authentication';
import {Player} from '../models';
import {PlayerRepository, SessionRepository} from '../repositories';
import {validateSession, validateEmail} from "../services/validator";

export class PlayerController {
  constructor(
      @repository(PlayerRepository)
      public playerRepository : PlayerRepository,
      @repository(SessionRepository)
      public sessionRepository : SessionRepository,
  ) {}

  @post('/players', {
    responses: {
      '200': {
        description: 'Player model instance',
        content: {'application/json': {schema: {'x-ts-type': Player}}},
      },
    },
  })
  @authenticate('jwt')
  async create(@requestBody() player: Player): Promise<Player> {
    await this.validateSchema(player);
    return await this.playerRepository.create(player);
  }

  @get('/players/count', {
    responses: {
      '200': {
        description: 'Player model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
      @param.query.object('where', getWhereSchemaFor(Player)) where?: Where<Player>,
  ): Promise<Count> {
    return await this.playerRepository.count(where);
  }

  @get('/players', {
    responses: {
      '200': {
        description: 'Array of Player model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Player}},
          },
        },
      },
    },
  })
  async find(
      @param.query.object('filter', getFilterSchemaFor(Player)) filter?: Filter<Player>,
  ): Promise<Player[]> {
    return await this.playerRepository.find(filter);
  }

  @patch('/players', {
    responses: {
      '200': {
        description: 'Player PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(Player, {partial: true}),
          },
        },
      })
          player: Player,
      @param.query.object('where', getWhereSchemaFor(Player)) where?: Where<Player>,
  ): Promise<Count> {
    await this.validateSchema(player);
    return await this.playerRepository.updateAll(player, where);
  }

  @get('/players/{id}', {
    responses: {
      '200': {
        description: 'Player model instance',
        content: {'application/json': {schema: {'x-ts-type': Player}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Player> {
    return await this.playerRepository.findById(id);
  }

  @patch('/players/{id}', {
    responses: {
      '204': {
        description: 'Player PATCH success',
      },
    },
  })
  async updateById(
      @param.path.number('id') id: number,
      @requestBody({
        content: {
          'application/json': {
            schema: getModelSchemaRef(Player, {partial: true}),
          },
        },
      })
          player: Player,
  ): Promise<void> {
    await this.validateSchema(player);
    await this.playerRepository.updateById(id, player);
  }

  @put('/players/{id}', {
    responses: {
      '204': {
        description: 'Player PUT success',
      },
    },
  })
  async replaceById(
      @param.path.number('id') id: number,
      @requestBody() player: Player,
  ): Promise<void> {
    await this.validateSchema(player);
    await this.playerRepository.replaceById(id, player);
  }

  @del('/players/{id}', {
    responses: {
      '204': {
        description: 'Player DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.playerRepository.deleteById(id);
  }

  async validateSchema (player: Player) {
    await validateEmail(player.email);
    await validateSession(player.sessionId, this.sessionRepository);
  }
}
