import { ContractPDFForm } from '@/components/Contract';
import ProgressIndicator from '@/components/ProgressIndicator/ProgressIndicator';

export default function ContractWrite() {
  return (
    <section>
      <h3 className="mb-10 text-title-small">계약 진행상황</h3>

      <ProgressIndicator />

      <h3 className="mb-5 mt-10 text-title-small">계약서 작성</h3>
      <p className="mb-5 text-text-large text-gray-dark">
        계약서 작성 후, 상대방에게 전송됩니다.
      </p>
      <p className="mb-1 text-gray-medium-dark">
        ※ 하단의 계약서 내용을 꼼꼼히 확인하고 필수 입력란을 작성해주세요.
      </p>
      <p className="mb-5 text-negative">
        ※ 작성을 완료하고 전송한 이후에는 더 이상 수정이 불가하니 신중히
        입력해주세요.
      </p>

      <ContractPDFForm />
    </section>
  );
}
