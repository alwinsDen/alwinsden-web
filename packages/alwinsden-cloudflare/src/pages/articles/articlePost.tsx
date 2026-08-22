import type { MetaFunction } from 'react-router';
import { data, useParams } from 'react-router';
import Entry from '../../components/Entry';
import style from '../../articles/common.module.css';
import { getArticle, getArticleComponent } from '../../articles/posts';

// Unknown slugs return a real 404 (same pattern as pages/notFound.tsx):
// non-indexable status while still rendering the page below.
export const loader = ({ params }: { params: { slug?: string } }) => {
  const found = params.slug ? getArticle(params.slug) : undefined;
  return found ? null : data(null, { status: 404 });
};

export const meta: MetaFunction = ({ params }) => {
  const article = params.slug ? getArticle(params.slug) : undefined;
  if (!article) return [{ title: '404 — alw1nsDen' }];
  return [
    { title: `${article.title} — alw1nsDen` },
    { name: 'description', content: article.description },
    { property: 'og:title', content: article.title },
    { property: 'og:description', content: article.description },
    { property: 'og:image', content: article.cover },
  ];
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

const ArticlePost = () => {
  const { slug } = useParams();
  const article = slug ? getArticle(slug) : undefined;
  // The loader guarantees a known slug, so Content is always defined here.
  const Content = slug ? getArticleComponent(slug)! : undefined;
  if (!article || !Content) {
    return (
      <Entry backgroundColor="#fff">
        <div className={style.article}>
          <h1>404</h1>
          <p>This article does not exist.</p>
          <a href="/articles">← All articles</a>
        </div>
      </Entry>
    );
  }

  return (
    <Entry backgroundColor="#ffffff">
      <article className={style.article}>
        <h1 className={style['article-title']}>{article.title}</h1>
        <p className={style.byline}>
          {formatDate(article.date)} · {article.author}
        </p>
        <Content />
      </article>
    </Entry>
  );
};

export default ArticlePost;
