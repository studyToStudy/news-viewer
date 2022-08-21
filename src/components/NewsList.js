import { useState, useEffect } from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';

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
    const [article, setArticle] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const query = category === 'all' ? '' : `&category=${category}`
                const response = await axios.get(
                    `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=9d3d84ca6daa4cb7a27ee3a9492e524b`,
                )
                setArticle(response.data.articles)
            } catch (e) {
                console.log(e)
            }
            setLoading(false)
        }
        fetchData();
    }, [category])

    if (loading) {
        return <NewsListBlock>대기중...</NewsListBlock>
    }
    if (!article) {
        return null;
    }
    return (
        <NewsListBlock>
            {article.map(article => (
                <NewsItem key={article.url} article={article} />
            ))}
        </NewsListBlock>
    )
}

export default NewsList;
