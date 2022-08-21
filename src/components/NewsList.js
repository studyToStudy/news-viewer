import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';
import usePromise from '../lib/usePromise';

const NewsListBlock = styled.div`
    box-sizing: border-box;
    padding-bottom: 3rem;
    width: 768px;
    margin: 0 auto;
    margin-top: 2rem;
    @media scrren and (max-widht: 768px){
        width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
    }
`;

const NewsList = ({ category }) => {
    const [loading, response, error] = usePromise(() => {
        const query = category === 'all' ? '' : `&category=${category}`
        return axios.get(
            `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=9d3d84ca6daa4cb7a27ee3a9492e524b`,
        )
    }, [category])

    // 대기중일떄
    if (loading) {
        return <NewsListBlock>대기중...</NewsListBlock>
    }
    if (!response) {
        return null;
    }
    if (error) {
        return <NewsListBlock>에러발생!</NewsListBlock>
    }
    // response값이 유효할 떄
    const { articles } = response.data;
    return (
        <NewsListBlock>
            {articles.map(article => (
                <NewsItem key={article.url} article={article} />
            ))}
        </NewsListBlock>
    )
}

export default NewsList;
