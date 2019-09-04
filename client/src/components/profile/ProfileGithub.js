import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class ProfileGithub extends Component {
  state = {
    clientId: "10d4ecb94bb511ca6245",
    clientSecret: "01ab521fcbd8734f1f51d5a28bd1fed4e142cd86",
    count: 5,
    sort: "created: asc",
    repos: [],
    error: true
  };

  componentDidMount() {
    const { username } = this.props;
    const { clientId, clientSecret, count, sort } = this.state;

    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        if (this.refs.myRef) {
          if (data.message !== "Not Found") {
            this.setState({
              error: false
            });
          }
          this.setState({ repos: data });
        }
      })
      .catch(err => {
        this.setState({ error: true });
      });
  }

  render() {
    const { repos, error } = this.state;
    let repoItems;

    if (error) {
      repoItems = <span>No reposetory found.</span>;
    } else {
      repoItems = repos.map(repo => (
        <div className="card card-body mb-2" key={repo.id}>
          <div className="row">
            <div className="col-md-6">
              <h4>
                <Link to={repo.html_url} className="text-info" target="_blank">
                  {repo.name}
                </Link>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div className="col-md-6">
              <span className="badge badge-info mr-1">
                Stars: {repo.stargazers_count}
              </span>
              <span className="badge badge-secondary mr-1">
                Watchers: {repo.watchers_count}
              </span>
              <span className="badge badge-success">
                Forks: {repo.forks_count}
              </span>
            </div>
          </div>
        </div>
      ));
    }

    return (
      <div ref="myRef">
        <hr />
        <h3 className="mb-4">Latest Github Repos</h3>
        {repoItems}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};

export default ProfileGithub;
