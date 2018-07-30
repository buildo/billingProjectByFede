package billing.model

case class Budget(title: String,
                  value: Option[String],
                  notes: Option[String],
                  defaultPricePerDay: Option[String],
                  costs: List[Cost])
