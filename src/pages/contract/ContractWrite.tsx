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
      <p className="mb-5 text-gray-medium-dark">
        ※ 계약서를 클릭해 작성해주세요.
      </p>

      <ContractPDFForm />
    </section>
  );
}
