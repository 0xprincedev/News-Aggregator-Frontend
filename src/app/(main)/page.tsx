'use client';

import { useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Icon } from '@iconify/react';
import { apiGetArticles } from '@/apis/article.api';
import Article from '@/components/Article';
import InputForm from '@/components/Forms/InputForm';
import SelectForm from '@/components/Forms/SelectForm';
import useAppSelector from '@/hooks/useAppSelector';

interface IForm {
	source?: string;
	category?: string;
	queue?: string;
}

export default function HomePage() {
	const [articles, setArticles] = useState<any[]>([]);
	const [form, setForm] = useState<IForm>({ source: '', category: '', queue: '' });
	const [hasMore, setHasMore] = useState<boolean>(true);
	const [pages, setPages] = useState<number>(1);
	const [loading, setLoading] = useState<boolean>(true);
	const { feeds } = useAppSelector((state) => state.user);

	useEffect(() => {
		getArticles(form, pages);
	}, []); //eslint-disable-line

	const getArticles = async (form: IForm, pages: number) => {
		try {
			setLoading(true);

			const articles = await apiGetArticles({ ...form, offset: (pages - 1) * 20, limit: 20 });

			setArticles((prev) => (pages === 1 ? articles : [...prev, ...articles]));
			setForm(form);
			setPages(pages);

			if (articles.length < 20) {
				setHasMore(false);
			} else {
				setHasMore(true);
			}
		} catch (err) {
			console.log(err);
			setHasMore(false);
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = (form: IForm) => {
		getArticles(form, 1);
	};

	return (
		<div className='container'>
			<div className='space-y-6 py-6 sm:py-2 sm:space-y-2'>
				<Form
					onSubmit={handleSubmit}
					render={({ handleSubmit }) => (
						<form className='flex gap-2 sm:flex-col' onSubmit={handleSubmit}>
							<Field name='source' className='w-full'>
								{(props) => (
									<SelectForm
										icon={<Icon icon='twemoji:rolled-up-newspaper' color='white' height={20} />}
										options={feeds.sources.map((source) => ({ label: source, value: source }))}
										{...props}
									/>
								)}
							</Field>
							<Field name='category' className='w-full'>
								{(props) => (
									<SelectForm
										icon={<Icon icon='tabler:category' color='white' height={20} />}
										options={feeds.categories.map((category) => ({
											label: category,
											value: category,
										}))}
										{...props}
									/>
								)}
							</Field>
							<Field name='q' className='w-full'>
								{(props) => (
									<InputForm
										icon={<Icon icon='fluent-emoji:pencil' color='white' height={20} />}
										placeholder='Keyword'
										{...props}
									/>
								)}
							</Field>
							<button
								type='submit'
								className='relative flex h-11 w-11 flex-shrink-0 items-center justify-center bg-primary-600 shadow hover:shadow-none disabled:opacity-50 sm:w-full'
								disabled={loading}
							>
								<Icon icon='material-symbols:search-check-rounded' color='white' height={28} />
								{loading && (
									<Icon
										icon='line-md:loading-twotone-loop'
										height={24}
										className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
									/>
								)}
							</button>
						</form>
					)}
				/>
				<InfiniteScroll
					dataLength={articles.length}
					hasMore={hasMore}
					loader={
						<div className='flex justify-center py-4 sm:py-2'>
							<Icon icon='line-md:loading-twotone-loop' height={24} />
						</div>
					}
					next={() => getArticles(form, pages + 1)}
					scrollableTarget='__next'
				>
					{!loading && articles.length === 0 ? (
						<p>Sorry, we couldn&apos;t find any matches for your search...</p>
					) : (
						<div className='space-y-5 sm:space-y-2'>
							{articles.map((article) => (
								<Article article={article} key={article.id} />
							))}
						</div>
					)}
				</InfiniteScroll>
			</div>
		</div>
	);
}
