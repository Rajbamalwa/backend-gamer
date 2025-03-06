import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from '../utils/ApiResponse.js';
import { Ground } from "../models/ground.model.js";

export const createGround = asyncHandler(async (req, res) => {

  const data = req.body

  try {
    const newGround = await Ground.create(data);
    return res.status(200).json(new ApiResponse(200, newGround, 'Ground created successfully!'));

  } catch (error) {
    console.log(error);
    return res.status(500).json(new ApiResponse(500, '', 'Server Error'));
  }
});

export const getAllGrounds = asyncHandler(async (req, res) => {
  const { gameType } = req.query;
  const { _id } = req.user

  try {
    const groundList = await Ground.aggregate([
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
          preserveNullAndEmptyArrays: true, // Ensures documents are not removed if gameType is null/empty
        },
      },
      {
        $match: {
          ...(gameType && gameType !== 'all' ? { 'gameType.name': gameType } : {}),
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
          preserveNullAndEmptyArrays: true, // Ensures documents are not removed if gameFeatures is null/empty
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
          address: 1,
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

    return res.status(200).json(new ApiResponse(200, groundDetails));
  } catch (error) {
    console.error(error);
    return res.status(500).json(new ApiResponse(500, '', 'Server Error'));
  }
});


export const groundUpdate = asyncHandler(async (req, res) => {

  const { _id } = req.params;
  const { updateField, updatedValue } = req.body

  try {

    const ground = await Ground.findById(_id)
    if (!ground) {
      return res.status(404).json(new ApiResponse(404, '', 'No data found'));
    }

    // Validate updateField
    if (!updateField || !(updateField in Ground.schema.paths)) {
      return res.status(400).json(new ApiResponse(400, '', 'Invalid update field'));
    }

    ground[updateField] = updatedValue;
    const updatedGround = await ground.save();
    return res.status(200).json(new ApiResponse(200, updatedGround, 'Updated successfully'));


  } catch (error) {
    console.error(error);
    return res.status(500).json(new ApiResponse(500, '', 'Server Error'));
  }

})

export const groundDelete = asyncHandler(async (req, res) => {
  const { _id } = req.params;

  try {

    const ground = await Ground.findById(_id)
    if (!ground) {
      return res.status(404).json(new ApiResponse(404, '', 'No data found'));
    }
    await Ground.findByIdAndDelete(_id)
    return res.status(200).json(new ApiResponse(200, '', 'Delete successfully'));


  } catch (error) {
    console.error(error);
    return res.status(500).json(new ApiResponse(500, '', 'Server Error'));
  }


})