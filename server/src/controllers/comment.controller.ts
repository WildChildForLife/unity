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
import {Comment} from '../models';
import {CommentRepository, PlayerRepository, SessionRepository} from '../repositories';
import {validatePlayer, validateSession} from "../services/validator";

export class CommentController {
  constructor(
    @repository(CommentRepository)
    public commentRepository : CommentRepository,
    @repository(PlayerRepository)
    public playerRepository : PlayerRepository,
    @repository(SessionRepository)
    public sessionRepository : SessionRepository,
  ) {}

  @post('/comments', {
    responses: {
      '200': {
        description: 'Comment model instance',
        content: {'application/json': {schema: {'x-ts-type': Comment}}},
      },
    },
  })
  @authenticate('jwt')
  async create(@requestBody() comment: Comment): Promise<Comment> {
    await this.validateSchema(comment);
    return await this.commentRepository.create(comment);
  }

  @get('/comments/count', {
    responses: {
      '200': {
        description: 'Comment model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Comment)) where?: Where<Comment>,
  ): Promise<Count> {
    return await this.commentRepository.count(where);
  }

  @get('/comments', {
    responses: {
      '200': {
        description: 'Array of Comment model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Comment}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Comment)) filter?: Filter<Comment>,
  ): Promise<Comment[]> {
    return await this.commentRepository.find(filter);
  }

  @patch('/comments', {
    responses: {
      '200': {
        description: 'Comment PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comment, {partial: true}),
        },
      },
    })
    comment: Comment,
    @param.query.object('where', getWhereSchemaFor(Comment)) where?: Where<Comment>,
  ): Promise<Count> {
    await this.validateSchema(comment);
    return await this.commentRepository.updateAll(comment, where);
  }

  @get('/comments/{id}', {
    responses: {
      '200': {
        description: 'Comment model instance',
        content: {'application/json': {schema: {'x-ts-type': Comment}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Comment> {
    return await this.commentRepository.findById(id);
  }

  @patch('/comments/{id}', {
    responses: {
      '204': {
        description: 'Comment PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comment, {partial: true}),
        },
      },
    })
    comment: Comment,
  ): Promise<void> {
    await this.validateSchema(comment);
    await this.commentRepository.updateById(id, comment);
  }

  @put('/comments/{id}', {
    responses: {
      '204': {
        description: 'Comment PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() comment: Comment,
  ): Promise<void> {
    await this.validateSchema(comment);
    await this.commentRepository.replaceById(id, comment);
  }

  @del('/comments/{id}', {
    responses: {
      '204': {
        description: 'Comment DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.commentRepository.deleteById(id);
  }

  async validateSchema(comment: Comment) {
    await this.validateComment(comment.feedback);
    await validatePlayer(comment.playerId, this.playerRepository);
    await validateSession(comment.sessionId, this.sessionRepository);
  }

  async validateComment(comment: string) {
    if (comment.length === 0) {
      throw await new HttpErrors.UnprocessableEntity('Feedback can\'t be null.');
    }
  }
}
