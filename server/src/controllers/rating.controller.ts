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
  HttpErrors,
} from '@loopback/rest';
import {authenticate} from '@loopback/authentication';
import {Rating} from '../models';
import {PlayerRepository, RatingRepository, SessionRepository} from '../repositories';
import {validatePlayer, validateSession, validatePlayersRatingSameSession} from "../services/validator";

export class RatingController {
  constructor(
    @repository(RatingRepository)
    public ratingRepository : RatingRepository,
    @repository(PlayerRepository)
    public playerRepository : PlayerRepository,
    @repository(SessionRepository)
    public sessionRepository : SessionRepository,
  ) {}

  @post('/ratings', {
    responses: {
      '200': {
        description: 'Rating model instance',
        content: {'application/json': {schema: {'x-ts-type': Rating}}},
      },
    },
  })
  @authenticate('jwt')
  async create(@requestBody() rating: Rating): Promise<Rating> {
    await this.validateSchema(rating);
    return await this.ratingRepository.create(rating);
  }

  @get('/ratings/count', {
    responses: {
      '200': {
        description: 'Rating model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Rating)) where?: Where<Rating>,
  ): Promise<Count> {
    return await this.ratingRepository.count(where);
  }

  @get('/ratings', {
    responses: {
      '200': {
        description: 'Array of Rating model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Rating}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Rating)) filter?: Filter<Rating>,
  ): Promise<Rating[]> {
    return await this.ratingRepository.find(filter);
  }

  @patch('/ratings', {
    responses: {
      '200': {
        description: 'Rating PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rating, {partial: true}),
        },
      },
    })
    rating: Rating,
    @param.query.object('where', getWhereSchemaFor(Rating)) where?: Where<Rating>,
  ): Promise<Count> {
    await this.validateSchema(rating);
    return await this.ratingRepository.updateAll(rating, where);
  }

  @get('/ratings/{id}', {
    responses: {
      '200': {
        description: 'Rating model instance',
        content: {'application/json': {schema: {'x-ts-type': Rating}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Rating> {
    return await this.ratingRepository.findById(id);
  }

  @patch('/ratings/{id}', {
    responses: {
      '204': {
        description: 'Rating PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rating, {partial: true}),
        },
      },
    })
    rating: Rating,
  ): Promise<void> {
    await this.ratingRepository.updateById(id, rating);
  }

  @put('/ratings/{id}', {
    responses: {
      '204': {
        description: 'Rating PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() rating: Rating,
  ): Promise<void> {
    await this.validateSchema(rating);
    await this.ratingRepository.replaceById(id, rating);
  }

  @del('/ratings/{id}', {
    responses: {
      '204': {
        description: 'Rating DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.ratingRepository.deleteById(id);
  }

  async validateSchema(rating: Rating) {
    await this.validateScore(rating.score);
    await validatePlayer(rating.playerId, this.playerRepository);
    await validateSession(rating.sessionId, this.sessionRepository);
    await validatePlayersRatingSameSession(rating.sessionId, rating.playerId, this.ratingRepository);
  }

  async validateScore(score: number) {
    if (score < 1 || score > 5) {
      throw new HttpErrors.UnprocessableEntity('Rating session should be between 1 and 5.');
    }
  }

}
