import jwtwebtoken from 'jsonwebtoken';
import UserService from '../../services/user.service';
import GeneralFunctionService from '../../services/generalfunction';
class UploadFileController {
  constructor() {}

  uploadFile = async (req, res, next) => {
    try {
      const userId = req.params.id;
      if (req.headers && req.headers.authorization) {
        let isTokenVerified = await GeneralFunctionService.verifyMyToken(
          req.headers.authorization.split(' ')[1],
          userId
        );
        if (isTokenVerified) {
          //   let result = await UserService.getUserDetails(userId);
          //   console.log('result ', result);
          //   if (result && result.length) {
          //     let finalResponse = {
          //       id: result[0].id,
          //       firstName: result[0].vFirstName,
          //       lastName: result[0].vLastName,
          //       fullName: result[0].vFullName || '',
          //       profileImage: result[0].vProfileImage || '',
          //       status: result[0].eStatus,
          //       email: result[0].vEmail,
          //       createdAt: result[0].dtCreatedAt,
          //     };
          //     finalResponse.date_of_birth =
          //       await GeneralFunctionService.changeDate(result[0].dDateOfBirth);
          //     res.status(200).json({
          //       success: 1,
          //       message: 'User details found successfully',
          //       data: finalResponse,
          //     });
          //   } else {
          //     res.status(200).json({
          //       success: 0,
          //       message: 'No user detail found',
          //       data: result,
          //     });
          //   }
        } else {
          res.status(403).json({
            success: 0,
            message: 'Invalid User ',
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
