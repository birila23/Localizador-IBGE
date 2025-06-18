import express from 'express';
const mapDataRouter = express.Router();

import {getMapData} from '../controller/svgReturn-controller.js';

mapDataRouter.get('/', getMapData);

export default mapDataRouter;
