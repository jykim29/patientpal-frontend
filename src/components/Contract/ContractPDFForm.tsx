export default function ContractPDFForm() {
  return (
    <div className="w-full overflow-auto border">
      <div className="mx-auto flex max-h-[800px] w-[1000px] flex-col gap-8 px-20 py-24 text-text-large">
        <div className="border-2 border-black py-3 text-center text-title-medium">
          <span>간병인 중개 표준 계약서(개인 간병)</span>
        </div>
        <p>
          간병인 중개업체(이하 ‘중개업체’라고 한다)는 간병인과 구인자(환자 또는
          보호자)가 아래와 같이 간병 계약을 체결하도록 중개한다.
        </p>

        <table className="contract-information-table">
          <tr>
            <th>중개업체</th>
            <th>상호</th>
            <td></td>
          </tr>
          <tr>
            <th rowSpan={5}>간병인</th>
            <th>성명</th>
            <td></td>
          </tr>
          <tr>
            <th>연락처</th>
            <td></td>
          </tr>
          <tr>
            <th>주소</th>
            <td></td>
          </tr>
          <tr>
            <th>관련 자격</th>
            <td></td>
          </tr>
          <tr>
            <th>간병 교육 이수</th>
            <td></td>
          </tr>
          <tr>
            <th rowSpan={5}>구인자</th>
            <th>성명</th>
            <td></td>
          </tr>
          <tr>
            <th>연락처</th>
            <td></td>
          </tr>
          <tr>
            <th>주소</th>
            <td></td>
          </tr>
          <tr>
            <th>환자와의 관계</th>
            <td></td>
          </tr>
        </table>

        <section className="contract-terms">
          <p>
            <strong className="contract-terms-title">제1조(목적)</strong>이
            계약은 환자의 건강 회복을 위한 간병인을 중개함에 있어 중개업체,
            간병인, 구인자의 권리와 의무에 대한 기본적인 사항을 정하는 것을
            목적으로 한다.
          </p>
        </section>

        <section className="contract-terms">
          <p>
            <strong className="contract-terms-title">제2조(간병의 범위)</strong>
            간병인은 환자에게 필요한 다음 각호의 간병 업무를 수행한다.
          </p>
          <ol className="contract-terms-list decimal">
            <li>
              환자의 식사, 개인위생, 침대시트 교체, 배설, 이동, 목욕, 수면 등
              일상생활 보조
            </li>
            <li>약물투여보조, 체위변경 등 환자에 대한 치료행위의 보조</li>
            <li>의료인의 지시에 따른 환자의 상태 관찰 및 보고</li>
            <li>산책, 보행훈련 등 재활훈련 보조</li>
            <li>
              기타 의료인의 지시에 따른 것으로, 환자의 회복을 위하여 필요한
              행위. 단 의료행위는 제외한다.
            </li>
          </ol>
        </section>

        <section className="contract-terms">
          <p>
            <strong className="contract-terms-title">제3조(계약사항)</strong>①
            간병인과 구인자는 간병 개시 전 다음 각 호의 사항을 협의하여 계약
            서를 작성하여야 한다.
          </p>
          <ol className="contract-terms-list decimal">
            <li>간병기간 및 시간</li>
            <li>간병 장소</li>
            <li>간병 요금, 지불 방식</li>
            <li>간병인의 휴게시간</li>
            <li>
              기타 사항 : 공휴일·명절 간병 시 요금, 휴일(유급 또는 무급), 식비,
              중개수수료, 현금영 수증 발급 여부 등
            </li>
          </ol>
          <p>
            ② 제1항 제3호의 간병요금을 정함에 있어 환자의 중증도를 고려하여야
            한다.
          </p>
          <p>
            ③ 제1항 제4호의 휴게시간을 정함에 있어 구체적인 휴게시간을 정하기
            어려운 경우에는 간병인이 4시간 근무시 식사시간을 포함하여 30분의
            휴게시간을 갖는 것으로 본다.
          </p>
        </section>

        <section>
          <span>
            <strong>[계약사항]</strong>
          </span>
          <table className="contract-form-table">
            <tr>
              <th className="divided-left" rowSpan={2}>
                간병 기간
              </th>
              <th className="divided-right">기한 없음</th>
              <td></td>
            </tr>
            <tr>
              <th className="divided-right">기한 있음</th>
              <td></td>
            </tr>
            <tr>
              <th colSpan={2}>간병시간</th>
              <td></td>
            </tr>
            <tr>
              <th colSpan={2}>간병장소</th>
              <td></td>
            </tr>
            <tr>
              <th colSpan={2}>휴게시간</th>
              <td></td>
            </tr>
            <tr>
              <th colSpan={2}>간병요금 지불방법</th>
              <td></td>
            </tr>
          </table>
        </section>
      </div>
    </div>
  );
}
