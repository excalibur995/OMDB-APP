/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import './index.scss';

interface GeneralTemplateInterface {
  title: string;
  withHeader?: boolean;
  children?: JSX.Element;
  isDetail?: boolean;
}

type SingleTemplate = Pick<GeneralTemplateInterface, 'title'>;

export function GeneralTemplate({ title, withHeader, children, isDetail }: GeneralTemplateInterface): JSX.Element {
  return (
    <div className={`full--page ${isDetail ? 'detail--page' : ''}`}>
      {withHeader && WithBackButton({ title })}
      <div className="content--container">{children}</div>
    </div>
  );
}

const WithBackButton: React.FunctionComponent<SingleTemplate> = ({ title }) => {
  const history = useHistory();
  const handleBack = () => history.goBack();
  return (
    <header className="topbar--container">
      <div className="topbar--insider detail--header">
        <AiOutlineArrowLeft onClick={handleBack} />
        <h6>{title}</h6>
      </div>
    </header>
  );
};

GeneralTemplate.defaultProps = {
  withHeader: false,
  title: '',
  isDetail: false,
};
