import {isEmpty} from 'lodash';

export const FALLBACK = 'blocking';



export const handleRedirectsAndReturnData = ( defaultProps: any, data: any, errors: any, field: any, isPreview = false, loginRedirectURL = '' ) => {
	
	if ( isPreview && null === data?.[field] ) {
		return {
			redirect: {
				destination: loginRedirectURL || '/',
				statusCode: 307
			}
		};
	}

	if ( isEmpty( data ) ) {
		return {
			redirect: {
				destination: '/503',
				statusCode: 301
			}
		};
	}

	if ( field && isEmpty( data?.[field] ) ) {
		return {
			// returns the default 404 page with a status code of 404
			notFound: true
		};
	}

	return defaultProps;
};
