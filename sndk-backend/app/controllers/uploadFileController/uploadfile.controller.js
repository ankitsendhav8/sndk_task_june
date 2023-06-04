import jwtwebtoken from 'jsonwebtoken';

import GeneralFunctionService from '../../services/generalfunction';
class UploadFileController {
  constructor() {}

  uploadFile = async (req, res, next) => {
    try {
      console.log('i am her');
      const userId = req.params.id;
      if (req.headers && req.headers.authorization) {
        let isTokenVerified = await GeneralFunctionService.verifyMyToken(
          req.headers.authorization.split(' ')[1],
          userId
        );
        if (isTokenVerified) {
          let result = req.files[0];
          if (result) {
            let finalResponse = {
              fileName: result.filename,
              path:
                process.env.IMAGE_PATH + result.destination + result.filename,
            };

            res.status(200).json({
              success: 1,
              message: 'Profile Image Uploaded Successfully',
              data: finalResponse,
            });
          } else {
            res.status(200).json({
              success: 0,
              message: 'Not uploaded',
              data: result,
            });
          }
        } else {
          res.status(400).json({
            success: 0,
            message: 'Unauthorized User ',
          });
        }
      } else {
        res.status(200).json({
          success: 0,
          message: 'Token not found',
        });
      }
    } catch (err) {
      res.status(500).json({
        success: 0,
        message: err.message || 'Something went wrong please try again',
      });
    }
  };
}
export default new UploadFileController();
