import React from 'react';
import './ImageGallery.css';
import NoImage from '../noImageWarning/NoImage.jsx';
import DefaultView from './DefaultView.jsx';
import ZoomModal from './ZoomModal.jsx';

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      styleImages: [],
      thumbnailStart: 0,
      thumbnailEnd: 6,
      mainImageIdx: 0,
      styleHistory: {},
    };
    this.scrollThumbnails = this.scrollThumbnails.bind(this);
    this.scrollMainImages = this.scrollMainImages.bind(this);
    this.updateMainImageHandler = this.updateMainImageHandler.bind(this);
    this.toggleExpanded = this.toggleExpanded.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { selectedStyle } = this.props;
    const getIdx = (hist) => {
      const nextID = selectedStyle.style_id;
      if (hist[nextID]) {
        return hist[nextID];
      }
      return 0;
    };

    if (prevProps.selectedStyle.style_id !== selectedStyle.style_id) {
      const photos = [...selectedStyle.photos, ...selectedStyle.photos];
      this.setState((prevState) => ({
        // styleImages: this.props.selectedStyle.photos,
        styleImages: photos,
        mainImageIdx: getIdx(prevState.styleHistory),
        styleHistory: {
          ...prevState.styleHistory,
          ...(prevProps.selectedStyle.style_id ? {
            [prevProps.selectedStyle.style_id]: prevState.mainImageIdx,
          } : {}),
        },
        thumbnailStart: 0,
        thumbnailEnd: 6,
        expanded: false,
      }));
    }
  }

  updateMainImageHandler(imageIdx) {
    this.setState({
      mainImageIdx: imageIdx,
    });
  }

  toggleExpanded() {
    const { expanded } = this.state;
    this.setState({
      expanded: !expanded,
    });
  }

  scrollMainImages(direction) {
    const { mainImageIdx, thumbnailEnd, thumbnailStart } = this.state;
    if ((mainImageIdx === thumbnailEnd && direction === 1)
      || (mainImageIdx === thumbnailStart && direction === -1)) {
      this.setState({
        mainImageIdx: mainImageIdx + direction,
        thumbnailStart: thumbnailStart + direction,
        thumbnailEnd: thumbnailEnd + direction,
      });
    } else {
      this.setState({
        mainImageIdx: mainImageIdx + direction,
      });
    }
  }

  scrollThumbnails(direction) {
    const { thumbnailStart, thumbnailEnd } = this.state;
    this.setState({
      thumbnailStart: thumbnailStart + direction,
      thumbnailEnd: thumbnailEnd + direction,
    });
  }

  renderImages() {
    const {
      expanded,
      styleImages,
      mainImageIdx,
    } = this.state;

    return (
      (!expanded
        ? (
          <DefaultView
            props={this.state}
            toggleExpanded={this.toggleExpanded}
            updateMainImageHandler={this.updateMainImageHandler}
            scrollThumbnails={this.scrollThumbnails}
            scrollMainImages={this.scrollMainImages}
          />
        )
        : (
          <ZoomModal
            styleImages={styleImages}
            mainImageIdx={mainImageIdx}
            toggleExpanded={this.toggleExpanded}
            scrollMainImages={this.scrollMainImages}
            updateMainImageHandler={this.updateMainImageHandler}
          />
        )
      ));
  }

  render() {
    const {
      styleImages,
    } = this.state;
    const { loaded } = this.props;
    return (
      <div className="container image-gallery">
        {styleImages[0]?.url
          ? this.renderImages()
          : <NoImage big={1} message={loaded ? 'Sorry, but there are no images available for this product.' : 'Loading...'} />}
      </div>
    );
  }
}

export default ImageGallery;
