import React, { useState, useEffect, useRef } from 'react';
import "./StorySection.css";
import profiles from "../assets/data/profiles.js";

const StorySection = () => {
    const [myProfile, setMyProfile] = useState([...profiles]);
    const [isStoryVisible, setIsStoryVisible] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const currentProfile = currentIndex !== null ? myProfile[currentIndex] : null;

    const timeoutRef = useRef(null);

    const handleNext = () => {
        setIsLoading(true);
        setCurrentIndex((prevIndex) => {
            if (prevIndex === myProfile.length - 1) {
                return 0;
            }
            return prevIndex + 1;
        });
    };

    const handlePrev = () => {
        setIsLoading(true);
        setCurrentIndex((prevIndex) => {
            if (prevIndex === 0) {
                return myProfile.length - 1;
            }
            return prevIndex - 1;
        });
    };

    useEffect(() => {
        if (isStoryVisible) {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);

            timeoutRef.current = setTimeout(() => {
                handleNext();
            }, 5000);
        }

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [currentIndex, isStoryVisible]); // re-run when index or visibility changes

    return (
        <div>
            {/* story pallet */}
            <div className="story-pallet">
                {myProfile.map((profile, index) => (
                    <div
                        key={profile.id}
                        style={{ display: 'inline-block', margin: '0 8px' }}
                    >
                        <div
                            className="profile-container"
                            onClick={() => {
                                setIsStoryVisible(true);
                                setCurrentIndex(index);
                                setIsLoading(true);
                            }}
                        >
                            <img src={profile.profile_pic} alt={profile.name} />
                        </div>
                        <p className="profile-name">{profile.name}</p>
                    </div>
                ))}
            </div>

            {/* story canvas */}
            {isStoryVisible && currentProfile && (
                <div
                    className="story-overlay"
                    onClick={() => setIsStoryVisible(false)}
                >
                    <div className="story-canvas" onClick={(e) => e.stopPropagation()}>
                        <p>{currentProfile?.name}</p>

                        {isLoading && <p>Loading story...</p>}

                        <img
                            src={currentProfile?.story_data}
                            alt="story"
                            style={{ display: isLoading ? 'none' : 'block' }}
                            onLoad={() => setIsLoading(false)}
                        />

                        <button
                            className="hide-btn"
                            onClick={() => setIsStoryVisible(false)}
                        >
                            X
                        </button>
                        <button className="left" onClick={handlePrev}>
                            ◁
                        </button>
                        <button className="right" onClick={handleNext}>
                            ▷
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StorySection;
