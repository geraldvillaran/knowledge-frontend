import apiService from 'app/store/apiService';
import { showMessage } from '@fuse/core/FuseMessage/fuseMessageSlice';
import { PartialDeep } from 'type-fest';

export const addTagTypes = ['academy_courses', 'academy_course', 'summarizer_categories'] as const;

const BASE_URL = 'http://localhost:8000';

const SummarizerApi = apiService
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getSummarizedDocs: build.query<GetSummarizedDocsApiResponse, GetSummarizedDocsApiArg>({
				query: () => ({ url: `${BASE_URL}/e-commerce/products` }),
				providesTags: ['academy_courses']
			}),
			getSummarizedDoc: build.query<GetSummarizedDocApiResponse, GetSummarizedDocApiArg>({
				// query: (queryArg) => ({ url: `/mock-api/academy/courses/${queryArg.sumdocId}` }),
				query: (queryArg) => ({ url: `${BASE_URL}/e-commerce/products/${queryArg.sumdocId}` }),
				providesTags: ['academy_course']
			}),
			updateSummarizedDoc: build.mutation<UpdateSummarizedDocApiResponse, UpdateSummarizedDocApiArg>({
				query: (queryArg) => ({
					url: `/mock-api/academy/courses/${queryArg.sumdocId}`,
					method: 'PUT',
					data: queryArg.data
				}),
				async onQueryStarted(id, { dispatch, queryFulfilled }) {
					try {
						await queryFulfilled;
						dispatch(showMessage({ message: 'Sumdoc Saved' }));
					} catch (err) {
						dispatch(showMessage({ message: 'Error Saving the sumdoc!' }));
					}
				},
				invalidatesTags: ['academy_courses', 'academy_course']
			}),
			deleteSummarizedDoc: build.mutation<DeleteSummarizedDocApiResponse, DeleteSummarizedDocApiArg>({
				query: (queryArg) => ({
					url: `/mock-api/academy/courses/${queryArg.sumdocId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['academy_courses']
			}),
			getSumdocCategories: build.query<GetSumdocCategoriesApiResponse, GetSumdocCategoriesApiArg>({
				query: () => ({ url: `/mock-api/summarizer/categories` }),
				providesTags: ['summarizer_categories']
			})
		}),
		overrideExisting: false
	});

export default SummarizerApi;
export type GetSummarizedDocsApiResponse = /** status 200 OK */ Sumdoc[];
export type GetSummarizedDocsApiArg = void;
export type GetSummarizedDocApiResponse = /** status 200 OK */ Sumdoc;
export type GetSummarizedDocApiArg = {
	sumdocId: string;
};

export type UpdateSummarizedDocApiResponse = unknown;
export type UpdateSummarizedDocApiArg = {
	sumdocId: string;
	data: PartialDeep<Sumdoc>;
};

export type DeleteSummarizedDocApiResponse = unknown;
export type DeleteSummarizedDocApiArg = {
	sumdocId: string;
};

export type GetSumdocCategoriesApiResponse = /** status 200 OK */ Category[];
export type GetSumdocCategoriesApiArg = void;
export type Sumdoc = {
	id: string;
	title: string;
	slug: string;
	description: string;
	category: string;
	duration: number;
	totalSteps: number;
	updatedAt: string;
	featured: boolean;
	progress: {
		currentStep: number;
		completed: number;
	};
	activeStep?: number;
	steps?: {
		content?: string;
		title?: string;
		subtitle?: string;
		order?: number;
	}[];
};

export type Category = {
	id: string;
	title: string;
	slug: string;
	color: string;
};

export const {
	useGetSummarizedDocsQuery,
	useGetSummarizedDocQuery,
	useUpdateSummarizedDocMutation,
	useDeleteSummarizedDocMutation,
	useGetSumdocCategoriesQuery
} = SummarizerApi;
