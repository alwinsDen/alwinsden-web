import type { MetaFunction } from 'react-router';
import { Link } from 'react-router';
import Entry from '../../components/Entry';
import style from '../../articles/common.module.css';
import { getAllArticles } from '../../articles/posts';

export const meta: MetaFunction = () => [
  { title: 'Articles — alw1nsDen' },
  {
    name: 'description',
    content: 'Articles on KMP, Compose and frontend development by alw1nsDen.',
  },
];

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

const ArticleList = () => {
  return (
    <Entry backgroundColor="#ffffff">
      <div className={style['article-list']}>
        <h1 className={style['list-title']}>ARTICLES</h1>
        {getAllArticles().map(article => (
          <Link key={article.slug} to={`/articles/${article.slug}`} className={style.card}>
            <img
              src={article.cover}
              alt=""
              className={style['card-cover']}
              width={600}
              height={200}
            />
            <h2 className={style['card-title']}>{article.title}</h2>
            <p className={style.byline}>
              {formatDate(article.date)} · {article.author}
            </p>
            <p className={style['card-description']}>{article.description}</p>
          </Link>
        ))}
      </div>
    </Entry>
  );
};

export default ArticleList;
