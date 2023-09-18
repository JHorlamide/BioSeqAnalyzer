import { Request, Response, NextFunction } from "express";
import redisCash from "../RedisCash/redisCash";
import config from "../../config/appConfig";
import responseHandler from "../../common/responseHandler";

class CacheMiddleware {
  public getCachedSummaryData = this.getCachedData(config.summaryCacheKey);

  public getCachedTopPermingVariantData = this.getCachedData(config.topVariantCacheKey);

  public getCachedScoreDistribution = this.getCachedData(config.scoreDistributionKey);

  private getCachedData(key: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const { projectId } = req.params;
      const cacheKey = `${key}-${projectId}`;

      try {
        const cacheResult = await redisCash.getCacheData(cacheKey);
        if (cacheResult !== null) {
          return responseHandler.successResponse(`Cached data retrieved for ${key}`, cacheResult, res);
        }

        return next();
      } catch (error: any) {
        return responseHandler.serverError(error.message, res);
      }
    }
  }
}

export default new CacheMiddleware();
