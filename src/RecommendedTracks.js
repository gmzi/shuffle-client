import React from 'react';
import { Row, Col, } from 'react-bootstrap';
// import ReactPlayer from 'react-player/wistia';
// import { useHistory } from 'react-router-dom';
import './Landing.css';
// import axios from 'axios';
// import logo from './icons/logo_white.png';
// import LoadingProgressContext from './LoadingProgressContext';

// const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;

export default function RecommendedTracks({ recommended }) {

    return (
        <section className="Stats">
            <Row className="">
                <>
                    {recommended.length ? (
                        <Col>
                            <Row>
                                <h6>Recommended songs for this time and day</h6>
                            </Row>
                            <Row>
                                <Col>
                                    <div
                                        className="Track d-flex m-2 align-items-center"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <a href={recommended[0].uri}>
                                            <img
                                                src={recommended[0].albumUrl}
                                                style={{ height: '64px', width: '64px' }}
                                                alt="album-cover"
                                            />
                                        </a>
                                        <a href={recommended[0].uri}>
                                            <div className="details ml-3">
                                                <div>{recommended[0].title}</div>
                                                <div className="details text-muted">
                                                    {recommended[0].artists.map((a) => a)}
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </Col>
                                <Col>
                                    <div
                                        className="Track d-flex m-2 align-items-center"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <a href={recommended[1].uri}>
                                            <img
                                                src={recommended[1].albumUrl}
                                                style={{ height: '64px', width: '64px' }}
                                                alt="album-cover"
                                            />
                                        </a>
                                        <a href={recommended[1].uri}>
                                            <div className="details ml-3">
                                                <div>{recommended[1].title}</div>
                                                <div className="details text-muted">
                                                    {recommended[1].artists.map((a) => a)}
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </Col>
                                <Col>
                                    <div
                                        className="Track d-flex m-2 align-items-center"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <a href={recommended[2].uri}>
                                            <img
                                                src={recommended[2].albumUrl}
                                                style={{ height: '64px', width: '64px' }}
                                                alt="album-cover"
                                            />
                                        </a>
                                        <a href={recommended[2].uri}>
                                            <div className="details ml-3">
                                                <div>{recommended[2].title}</div>
                                                <div className="details text-muted">
                                                    {recommended[2].artists.map((a) => a)}
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </Col>
                                <Col>
                                    <div
                                        className="Track d-flex m-2 align-items-center"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <a href={recommended[3].uri}>
                                            <img
                                                src={recommended[3].albumUrl}
                                                style={{ height: '64px', width: '64px' }}
                                                alt="album-cover"
                                            />
                                        </a>
                                        <a href={recommended[3].uri}>
                                            <div className="details ml-3">
                                                <div>{recommended[3].title}</div>
                                                <div className="details text-muted">
                                                    {recommended[3].artists.map((a) => a)}
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    ) : (
                        <div></div>
                    )}
                </>
            </Row>
        </section>
    )

}