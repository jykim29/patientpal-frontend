import ContractForm from '@/components/Form/contract/ContractForm';

export default function ContractWrite() {
  return (
    <section>
      <h3 className="mb-2 text-title-small">계약서 작성</h3>

      <p className="mb-2 text-gray-dark">
        상대방에게 전송할 온라인 계약서를 작성합니다.
      </p>
      <p className="mb-1 text-text-small text-gray-medium-dark">
        ※ 모든 입력 항목을 빠짐없이 작성해주세요.
      </p>
      <p className="mb-5 text-text-small text-negative">
        ※ 계약서를 전송한 이후에는 수정이 불가하오니 신중이 작성해주세요.
      </p>

      <ContractForm />
    </section>
  );
}
