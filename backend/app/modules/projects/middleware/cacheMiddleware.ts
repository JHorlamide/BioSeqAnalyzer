import { Request, Response, NextFunction } from "express";
import { RES_MSG } from "../types/constants";
import redisCash from "../RedisCash/redisCash";
import config from "../../../config/appConfig";
import responseHandler from "../../../common/responseHandler";

class CacheMiddleware {
  public async getCachedSummaryData(req: Request, res: Response, next: NextFunction) {
    const { projectId } = req.params;
    const { summaryCacheKey } = config;
    const cacheKey = `${summaryCacheKey}-${projectId}`;

    try {
      const cachedSummaryData = await redisCash.getCacheData(cacheKey);
      if (cachedSummaryData !== null) {
        return responseHandler.successResponse(RES_MSG.SUMMARY_FETCHED, cachedSummaryData, res);
      }

      return next();
    } catch (error: any) {
      return responseHandler.serverError(error.message, res);
    }
  }

  public async getCachedTopPermingVariantData(req: Request, res: Response, next: NextFunction) {
    const { projectId } = req.params;
    const { topVariantCacheKey } = config;
    const cacheKey = `${topVariantCacheKey}-${projectId}`;

    try {
      const cachedTopPerformingVariantData = await redisCash.getCacheData(cacheKey);
      if (cachedTopPerformingVariantData !== null) {
        return responseHandler.successResponse(RES_MSG.SUMMARY_FETCHED, cachedTopPerformingVariantData, res);
      }

      return next();
    } catch (error: any) {
      return responseHandler.serverError(error.message, res);
    }
  }

  public async getCachedScoreDistribution(req: Request, res: Response, next: NextFunction) {
    const { projectId } = req.params;
    const { scoreDistributionKey } = config;
    const cacheKey = `${scoreDistributionKey}-${projectId}`;

    try {
      const scoreDistribution = await redisCash.getCacheData(cacheKey);
      if (scoreDistribution !== null) {
        return responseHandler.successResponse(RES_MSG.SUMMARY_FETCHED, scoreDistribution, res);
      }

      return next();
    } catch (error: any) {
      return responseHandler.serverError(error.message, res);
    }
  }
}

export default new CacheMiddleware();