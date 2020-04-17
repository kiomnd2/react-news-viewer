import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import usePromise from '../lib/usePromise';

const NewsListBlock = styled.div`
	box-sizing: border-box;
	padding-bottom: 3rem;
	width: 768px;
	margin: 0 auto;
	margin-top: 2rem;
	@media screen and (max-width: 768px) {
		width : 100%,
		padding-left:1rem;
		padding-right:1rem;
	}
`;
const NewsList = ({category}) => {
	const [loading, response, error] = usePromise(()=>{
		const query = category === 'all' ? '' : `&category=${category}`;
		return axios.get(
			`http://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=9d91ff0529244b459e967ed949c8058c`
		);
	},[category]);

	/*
	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {

				setArticles(response.data.articles);
			} catch (e) {
				console.log(e);
			}
			setLoading(false);
		};
		fetchData();
	},[category]);*/

	if( loading) {
		return <NewsListBlock>대기중 ... </NewsListBlock>
	}

	if( !response) {
		return null;
	}

	if(error) {
		return <NewsListBlock>에러 발생</NewsListBlock>
	}

	const { articles } = response.data;
	return (
		<NewsListBlock>
			{ articles.map( article => (
				<NewsItem key={article.url} article={article} />
			))}
		</NewsListBlock>
	);
};

export default NewsList;
