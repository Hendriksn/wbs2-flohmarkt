import {EntityManager, Repository} from 'typeorm';
import {
    Controller,
    Get,
    Post,
    Body, Delete, Param
} from "@nestjs/common";
import {Favorites} from "./entity/favorites.entity";
import {PostFavoriteDto} from "./PostFavoriteDto";
import {MessageResultDto} from "../Dto/MessageResultDto";


@Controller('favorites')
export class FavoritesController {

    private favoritesRepository: Repository<Favorites>;


    constructor(private entityManager: EntityManager) {
        this.favoritesRepository = entityManager.getRepository(Favorites);
    }


    // gets all existing entries from the favorites entity
    @Get()
    findAll() {
        return this.favoritesRepository.find()
    }


    // Gets all favorites from specific user
    @Get(':userId')
    async getFavoritesForUser(@Param('userId') userId: number): Promise<Favorites[]> {
        const favorites = await this.favoritesRepository.find({
            where: {userId},
        });
        return favorites;
    }


    // Creates a new entry in Favorites Entity with a userID-articleID-relationship
    @Post()
    async postFavorite(
        @Body() body: PostFavoriteDto,
    ): Promise<MessageResultDto> {

        // check if article is already on favorite list
        // works when requests are made via postman, but not when coming from the frontend
        const existingFavorite = await this.favoritesRepository.findOne({
            where: {
                userId: body.userId,
                articleId: body.articleId,
            }
        });
        if (existingFavorite != null) {
            return new MessageResultDto(
                `Article ${body.articleId} is already on your favorite list.`
            );
        }
        // create new favorite
        const newFavorite = Favorites.create(body.userId, body.articleId);
        await this.favoritesRepository.save(newFavorite);

        return new MessageResultDto(
            `${newFavorite.id} erfolgreich angelegt`,
        );
    }


    // deletes all entries from favorites - needs security rules
    @Delete()
    async deleteAllFavorites(): Promise<MessageResultDto> {
        await this.favoritesRepository.delete({});

        return new MessageResultDto('All favorites deleted successfully.');
    }


}
