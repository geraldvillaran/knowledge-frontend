import { apiService as api } from 'app/store/apiService';
import { showMessage } from '@fuse/core/FuseMessage/fuseMessageSlice';
import { PartialDeep } from 'type-fest';
import SumdocModel from './sumdoc/models/SumdocModel';

export const addTagTypes = ['sumdocs', 'sumdoc', 'academy_courses', 'academy_course', 'summarizer_categories'] as const;

const BASE_URL = 'http://localhost:8000';

const SummarizerApi = api
	.enhanceEndpoints({
		addTagTypes,
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getSummarizedDocs: build.query<GetSummarizedDocsApiResponse, GetSummarizedDocsApiArg>({
				query: () => ({ url: `${BASE_URL}/summarizer/sumdocs` }),
				providesTags: ['academy_courses']
			}),
			getSummarizedDoc: build.query<GetSummarizedDocApiResponse, GetSummarizedDocApiArg>({
				// query: (queryArg) => ({ url: `/mock-api/academy/courses/${queryArg.sumdocId}` }),
				query: (queryArg) => ({ url: `${BASE_URL}/summarizer/sumdocs/${queryArg.sumdocId}` }),
				providesTags: ['academy_course']
			}),
			createSummarizedDoc: build.mutation<CreateSummarizedDocApiResponse, CreateSummarizedDocApiArg>({
				query: (newSummarizedDoc) => ({
					url: `${BASE_URL}/summarizer/sumdocs`,
					method: 'POST',
					data: SumdocModel(newSummarizedDoc)
				}),
				invalidatesTags: ['sumdocs', 'sumdoc']
			}),
			updateSummarizedDoc: build.mutation<UpdateSummarizedDocApiResponse, UpdateSummarizedDocApiArg>({
				query: (sumdoc) => ({
					url: `${BASE_URL}/summarizer/sumdocs/${sumdoc.id}`,
					method: 'PUT',
					data: sumdoc
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
				query: (sumdocId) => ({
					url: `${BASE_URL}/summarizer/sumdocs/${sumdocId}`,
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

export type CreateSummarizedDocApiResponse = /** status 200 OK */ Sumdoc;
export type CreateSummarizedDocApiArg = PartialDeep<Sumdoc>;

export type UpdateSummarizedDocApiResponse = unknown;
export type UpdateSummarizedDocApiArg = PartialDeep<Sumdoc>;// Document

export type DeleteSummarizedDocApiResponse = unknown;
export type DeleteSummarizedDocApiArg = string;

export type GetSumdocCategoriesApiResponse = /** status 200 OK */ Category[];
export type GetSumdocCategoriesApiArg = void;

export type EcommerceProductImageType = {
	id: string;
	url: string;
	type: string;
};

type SummaryModel = {
	model: string;
	summary: string;
};

export type SummaryType = {
	summary_a: SummaryModel[];
	summary_b: SummaryModel[];
};

export type Sumdoc = {
	id: string;
	name: string;
	handle: string;
	description: string;
	category: string;
	categories: string[];
	tags: string[];
	featuredImageId: string;
	images: EcommerceProductImageType[];
	priceTaxExcl: number;
	priceTaxIncl: number;
	taxRate: number;
	comparedPrice: number;
	quantity: number;
	sku: string;
	width: string;
	height: string;
	depth: string;
	weight: string;
	extraShippingFee: number;
	active: boolean;
	title: string;
	slug: string;
	duration: number;
	totalSteps: number;
	updatedAt: string;
	featured: boolean;
	progress: { currentStep: string, completed: string }[];
	steps: { order: number, title: string, subtitle: string, content: string }[];
	summaries: SummaryType[];
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
	useGetSumdocCategoriesQuery,
	useCreateSummarizedDocMutation
} = SummarizerApi;

export type SummarizerApiType = {
	[SummarizerApi.reducerPath]: ReturnType<typeof SummarizerApi.reducer>;
};