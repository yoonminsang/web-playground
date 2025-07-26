interface Props {
  error: any;
  onResetError: VoidFunction;
}

export const CommonErrorUI = ({ onResetError }: Props) => {
  return (
    <div>
      <div>예상치 못한 에러가 발생햇습니다. 확인버튼을 눌러도 계속 에러가 발생한다면 문의해주세요</div>
      <button onClick={onResetError}>확인</button>
    </div>
  );
};
