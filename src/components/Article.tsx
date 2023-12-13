'use client';

import Link from 'next/link';
import { Icon } from '@iconify/react';

interface IArticle {
	article: any;
}

const Article: React.FC<IArticle> = ({ article }) => {
	return (
		<Link
			href={article.url}
			className='group relative flex cursor-pointer gap-4 bg-gray-200 p-4 shadow-[1px_2px_1px_1px_#0002] transition hover:shadow-none sm:flex-col'
			target='_blank'
		>
			<Icon
				icon='material-symbols:favorite-outline'
				className='absolute right-2 top-2 '
				color='red'
				height={20}
			/>
			<img
				src={article.urlToImage}
				alt=''
				className='h-40 w-60 flex-shrink-0 object-cover shadow-[1px_2px_2px_1px_#0002] transition group-hover:shadow-none sm:mx-auto'
				draggable={false}
			/>
			<div className='flex flex-grow flex-col justify-between space-y-2 overflow-hidden py-2 sm:py-0'>
				<div className='space-y-1'>
					<h3 className='line-clamp-2 text-lg font-bold leading-6'>{article.title}</h3>
					<p className='line-clamp-2 text-base'>{article.content}</p>
				</div>
				<div className='mt-auto flex w-full flex-wrap gap-2'>
					<p className='text-sm'>Source: {article.source}</p>
					{article.author && <p className='text-sm'>Author: {article.author}</p>}
					<p className='ml-auto text-sm'>
						{new Date(article.publishedAt).toLocaleString('en-US', {
							month: 'short',
							day: '2-digit',
							year: 'numeric',
							hour: '2-digit',
							minute: '2-digit',
						})}
					</p>
				</div>
			</div>
		</Link>
	);
};

export default Article;
