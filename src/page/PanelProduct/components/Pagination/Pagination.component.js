import {Component} from 'react';

class Pagination extends Component {
	render() {
		const {postsPerPage, totalPosts, paginate, nextPage, prevPage} = this.props;
		
		const pageNumbers = [];
		
		for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
			pageNumbers.push(i);
		}
		return (
			<nav style={{direction: 'ltr', marginTop: '20px'}}>
				<ul className="pagination justify-content-center">
					<li className="page-item">
						<a className="page-link" href="#" onClick={() => prevPage()}>قبلی</a>
					</li>
					{pageNumbers.map(num => (
						<li className="page-item" key={num}>
							<a onClick={() => paginate(num)} href="#" className="page-link">{num}</a>
						</li>
					))}
					<li className="page-item">
						<a className="page-link" href="#" onClick={() => nextPage()}>بعدی</a>
					</li>
				</ul>
			</nav>
		);
	}
}

export {Pagination};