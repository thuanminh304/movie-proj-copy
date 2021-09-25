import { Button } from "@material-ui/core";
import React from "react";
import { useSelector,useDispatch } from "react-redux";

function MovieChair(props) {
  let { data } = props;
  const bookingChairList = useSelector(
    (state) => state.bookingChairListReducer
  );
  const renderMovieChair = (data) => {
    return data.danhSachGhe.map((chair, index) => {
      let indexChair = bookingChairList.findIndex(
        (choseChair) => choseChair.maGhe === chair.maGhe
      );
      // eslint-disable-next-line no-undef
      let classBookedChair = chair.daDat ? classes.bookedChair : null;
      // eslint-disable-next-line no-undef
      let classVipChair = chair.loaiGhe === "Vip" ? classes.vipChair : null;
      let classChoosingChair = null;
      if (indexChair !== -1) {
        // eslint-disable-next-line no-undef
        classChoosingChair = classes.choosingchair;
      }
      return (
        // eslint-disable-next-line react/jsx-no-undef
        <Fragment>
          <Button
            disabled={chair.daDat}
            // eslint-disable-next-line no-undef
            className={`${classes.chair} ${classBookedChair} ${classVipChair} ${classChoosingChair}`}
            onClick={() => {
              // eslint-disable-next-line no-undef
              dispatch({
                type: "CHOOSE_CHAIR",
                choosingChair: chair,
              });
            }}
          >
            {chair.daDat ? "X" : chair.stt}
          </Button>
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };
  return <div style={{ width: "80%", margin: "15px auto" }}></div>;
}
export default MovieChair;
