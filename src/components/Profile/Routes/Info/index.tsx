import {
  FieldBasicEditBigInput,
  FieldBasicEditInput,
  FieldEditInput,
} from '../../../common/inputs';

export const ProfileInfo = () => {
  return (
    <>
      <div className="mb-6">
        <FieldBasicEditInput
          name="name"
          title="Name"
          description="
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil
            reprehenderit repellendus tempora autem culpa minima illo delectus
            placeat accusamus a at exercitationem sed, rem suscipit id tenetur
            distinctio dolorum harum."
          placeholder="Enter channel name"
          value=""
          handleChange={() => {}}
          error=""
          type="text"
        ></FieldBasicEditInput>
      </div>
      <div className="mb-6">
        <FieldBasicEditInput
          name="handle"
          title="Handle"
          description="
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil
            reprehenderit repellendus tempora autem culpa minima illo delectus
            placeat accusamus a at exercitationem sed, rem suscipit id tenetur
            distinctio dolorum harum."
          placeholder="Set your handle"
          value=""
          handleChange={() => {}}
          error=""
          type="text"
        ></FieldBasicEditInput>
      </div>
      <div className="mb-6">
        <FieldBasicEditBigInput
          name="description"
          title="Description"
          description=""
          placeholder="Tell viewers about channel"
          value=""
          handleChange={() => {}}
          error=""
        ></FieldBasicEditBigInput>
      </div>
    </>
  );
};
