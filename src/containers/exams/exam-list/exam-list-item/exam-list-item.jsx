import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card} from 'reactstrap';
import {safeRetrieve} from "../../../../utils/retrieve-value-utils";
import Image from "../../../../commons/image/image";
import {getDayMonthYearString} from "../../../../utils/datetime-utils";

class ExamListItem extends Component {

    render() {
        const {examItem} = this.props;
        const is_confirm = examItem.is_confirm === 'true';
        return (
            <Card body className="exam-list-item">
                <PreviewExam examItem={examItem} />
                <div className="information">
                    <h5>{truncateTitle(safeRetrieve(examItem, ['title']) || '')}</h5>
                    <div className="description d-flex flex-column justify-content-between">
                        <div>
                            <div className="text-secondary">Đăng bởi: {safeRetrieve(examItem, ['post_by'])}</div>
                            <div className="text-secondary">Ngày đăng: {getDayMonthYearString(safeRetrieve(examItem, ['create_time']))}</div>
                        </div>
                        <div className="view-vote text-secondary d-flex align-items-center justify-content-between">
                            <span>
                                <span className="vote-info">
                                    <i className="fa fa-eye" /> {safeRetrieve(examItem, ['views']) || 0}
                                </span>
                                <span className="vote-info">
                                    <i className="fa fa-thumbs-up" /> {safeRetrieve(examItem, ['up_vote']) || 0}
                                </span>
                                <span className="vote-info">
                                    <i className="fa fa-thumbs-down" /> {safeRetrieve(examItem, ['down_vote']) || 0}
                                </span>
                            </span>
                            {is_confirm ? <i className="fa fa-check-circle text-success" title="Đã kiểm duyệt"/> : null}
                        </div>
                    </div>
                </div>
            </Card>
        );
    };

}

function PreviewExam({examItem}) {
    return <Image
        src={safeRetrieve(examItem, ['preview_attachment'])}
        alt="Xem trước"
        width="100%" height="60%"
    /> ;
}

function truncateTitle(title) {
    const max_length = 50;
    return title.length > max_length ? title.substr(0, max_length) + '...' : title;
}

ExamListItem.propTypes = {
    examItem: PropTypes.object.isRequired,
};

export default ExamListItem;