import { LoggerService } from "./config.service";
import { Faq, IFaq } from "../models/Faq.model";
import { getUsers } from "./user.service";

const logger = new LoggerService();

export async function createFaq(faqData: IFaq): Promise<IFaq> {
  try {
    const user = await getUsers({ _id: faqData.userId });
    if (!user) {
      throw new Error("User not found");
    }
    const faq = new Faq(faqData);
    await faq.save();
    logger.log("Faq created", { faq });
    return faq;
  } catch (error) {
    logger.error("Failed to create Faq", { faqData, error });
    throw error;
  }
}

//getFaqById

//findOne

//updateFaq

//deleteFaq

//createFaqAnswer
