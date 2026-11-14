import {Router} from 'express';
import { AddProperty , ShowProperty, 
    UpdateProperty, DeleteProperty
    }from '../controllers/Property.controller.js';
import VerifyToken from '../middleware/auth.middleware.js';

const Pro_router = Router();

Pro_router.route('/Add').post(AddProperty, VerifyToken);
Pro_router.route('/Show').get(ShowProperty, VerifyToken);
Pro_router.route('/Update/:id').patch(UpdateProperty, VerifyToken);
Pro_router.route('/Delete/:id').delete(DeleteProperty, VerifyToken);

export default Pro_router;