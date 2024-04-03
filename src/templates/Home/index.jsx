import '../../style/global-styles.css';

import { Component } from 'react';
import { loadPosts } from '../../utils/load-posts'
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export class Home extends Component {

  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postPerPage: 5,
    searchValue: ''
  };

  componentDidMount() {
    this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postPerPage } = this.state;
    const postsandphotos = await loadPosts();
    this.setState({
      posts: postsandphotos.slice(page, postPerPage),
      allPosts: postsandphotos
    });
  }

  loadMorePages = () => {
    const { page, postPerPage, allPosts, posts } = this.state;
    const nextPage = page + postPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postPerPage);
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value })
  }

  render() {
    const { posts, page, postPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ?
      allPosts.filter(post => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
      :
      posts;

    return (
      <section className='container'>
        <div className="search-container">
          {!!searchValue && (
            <h1>Search Value: {searchValue}</h1>
          )}

          <TextInput
            searchValue={searchValue}
            handleChange={this.handleChange}
          />
        </div>
        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}

        {filteredPosts.length === 0 && (
          <h2>Post not exist</h2>
        )}
        <div className="button-container">
          {!searchValue && (
            <Button text="Load more posts"
              onClick={this.loadMorePages}
              disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Ola Mundo!!
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div >
//   );
// }


