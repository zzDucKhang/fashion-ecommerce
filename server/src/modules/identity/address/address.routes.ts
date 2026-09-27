import { Router } from 'express'
import { authGuard } from '@/middlewares/guards/auth.guard'
import { validateRequest } from '@/middlewares/pipes/validate.pipe'
import { AddressController } from './address.controller'
import {
	addressParamsSchema,
	createAddressBodySchema,
	getAddressQuerySchema,
	updateAddressBodySchema,
} from './address.schema'

export const addressRouter = Router()
const controller = new AddressController()

addressRouter.use(authGuard)
addressRouter.get('/', validateRequest({ query: getAddressQuerySchema }), controller.getListAddresses)
addressRouter.get('/:addressId', validateRequest({ params: addressParamsSchema }), controller.getAddressById)
addressRouter.post('/', validateRequest({ body: createAddressBodySchema }), controller.createAddress)
addressRouter.put('/:addressId', validateRequest({ params: addressParamsSchema, body: updateAddressBodySchema }), controller.updateAddress)
addressRouter.delete('/:addressId', validateRequest({ params: addressParamsSchema }), controller.deleteAddress)
