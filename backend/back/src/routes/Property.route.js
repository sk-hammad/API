import {Router} from 'express';
import { AddProperty , ShowProperty, 
    UpdateProperty, DeleteProperty
    }from '../controllers/Property.controller.js';

const Pro_router = Router();

Pro_router.route('/Add').post(AddProperty);
Pro_router.route('/Show').get(ShowProperty);
Pro_router.route('/Update/:id').patch(UpdateProperty);
Pro_router.route('/Delete/:id').delete(DeleteProperty);

export default Pro_router;