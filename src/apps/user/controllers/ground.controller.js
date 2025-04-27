import { asyncHandler } from "../../../utils/asyncHandler.js";
import { ApiResponse } from "../../../utils/ApiResponse.js";
import { Ground } from "../../../models/ground.model.js";
import { Reviews } from "../../../models/reviews.model.js";
import { GameType } from '../../../models/gameType.model.js'; 
import { GameFeatures } from '../../../models/gameFeatures.model.js';


import mongoose from "mongoose";


export const getAllGrounds = asyncHandler(async (req, res) => {
  const { gameType,lat,lng } = req.body;
  const { _id } = req.user
  
  
  try {
    const groundList = await Ground.aggregate([
      // {
      //   $geoNear: {
      //     near: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
      //     distanceField: "distance",
      //     spherical: true,
      //   },
      // },
      {
        $lookup: {
          from: 'gametypes',
          localField: 'gameTypeId',
          foreignField: '_id',
          as: 'gameType',
        },
      },
      {
        $unwind: {
          path: '$gameType',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          ...(gameType && gameType !== "all" && { 'gameType.name': gameType }),
        },
      },
      {
        $lookup: {
          from: 'gamefeatures',
          localField: 'gameFeaturesId',
          foreignField: '_id',
          as: 'gameFeatures',
        },
      },
      {
        $unwind: {
          path: '$gameFeatures',
          preserveNullAndEmptyArrays: true, 
        },
      },
      
      {
        $project: {
          name: 1,
          description: 1,
          lat: 1,
          lng: 1,
          city: 1,
          state: 1,
          country: 1,
          // distance: 1, // Include the calculated distance

          address: 1,
          location: 1,
          image: {
            $cond: {
              if: { $isArray: '$image' },
              then: { $arrayElemAt: ['$image', 0] },
              else: '$image',
            },
          },
          index: 1,
          likes: {
            $cond: {
              if: { $isArray: "$likedBy" },
              then: { $size: "$likedBy" },
              else: 0,
            }
          },
          isLiked: {
            $cond: {
              if: { $isArray: "$likedBy" },
              then: { $in: [_id, "$likedBy"] },
              else: false,
            }
          }, equipmentProvide: 1,
          toilet: 1,
          changingRoom: 1,
          parking: 1,
          showers: 1,
          pricing: 1,
          discountAmount: 1,
          discountText: 1

        },
      },
    ]);

    if (groundList.length === 0) {
      return res.status(404).json(new ApiResponse(404, '', 'No Data found'));
    }
    return res.status(200).json(new ApiResponse(200, groundList));
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiResponse(500, '', 'Server Error'));
  }
});

export const getGroundDetails = asyncHandler(async (req, res) => {
  const { _id } = req.params;

  try {

    const groundReviewRating = await Reviews.aggregate([
      { $match: { groundId: new mongoose.Types.ObjectId(_id) } },
      {
        $group: {
          _id: "$groundId",
          averageRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 }, 
        },
      },
      {
        $project : {
          _id : 0,
          averageRating : 1,
          totalReviews : 1
        }
      }
    ]).then(res => res.at(0) || { averageRating: 0, totalReviews: 0 });

    const groundDetails = await Ground.findById(_id)
      .populate({
        path: 'gameTypeId',
        select: 'name description',
      })
      .populate({
        path: 'gameFeaturesId',
        select: 'name description',
      })
    // .select('bookingStatus equipmentProvide toilet changingRoom parking showers cancelPolicy  refundPolicy gameTypeId gameFeaturesId image'); 

    if (!groundDetails) {
      return res.status(404).json(new ApiResponse(404, '', 'No Data found'));
    }

    return res.status(200).json(new ApiResponse(200, {groundDetails,groundReviewRating},));
  } catch (error) {
    console.error(error);
    return res.status(500).json(new ApiResponse(500, '', 'Server Error'));
  }
});


export const createGround = asyncHandler(async (req, res) => {

  const data = req.body
  const { _id } = req.user;

  try {
    const newGround = await Ground.create({
      ...data,
      userId : _id 
    });
    return res.status(200).json(new ApiResponse(200, newGround, 'Ground created successfully!'));

  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiResponse(500, '', 'Server Error'));
  }
});